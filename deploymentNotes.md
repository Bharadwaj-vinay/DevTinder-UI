# Steps to Deploy the Project to an AWS EC2 Instance

1. **Launch an EC2 Instance**  
    - Log in to the AWS Management Console.  
    - Navigate to the EC2 dashboard and launch a new instance.  
    - Choose an appropriate AMI (e.g., Amazon Linux 2 or Ubuntu).  
    - Select an instance type (e.g., t2.micro for small projects).  
    - Configure security groups to allow necessary ports (e.g., 22 for SSH, 80/443 for HTTP/HTTPS).  
    - Launch the instance and download the key pair.

2. **Connect to the EC2 Instance**  
    - Use the downloaded `.pem` file to SSH into the instance:  
      ```bash
      ssh -i "your-key.pem" ec2-user@your-ec2-public-ip
      ```

3. **Install Required Dependencies**  
    - Update the package manager:  
      ```bash
      sudo yum update -y  # For Amazon Linux
      sudo apt update -y  # For Ubuntu
      ```
    - Install necessary software (e.g., Node.js, Nginx, Docker):  
      ```bash
      sudo yum install -y nodejs npm  # Example for Node.js
      ```

4. **Transfer Project Files**  
    - Use `scp` or a similar tool to copy project files to the instance:  
      ```bash
      scp -i "your-key.pem" -r /path/to/project ec2-user@your-ec2-public-ip:/home/ec2-user/
      ```

      or `git clone project_url` project_url is from git

      "ls" is the code for listing all projects on the instance
      Then go to the app eg cd DevTinder-UI/
      
        sudo yum update

        sudo yum install nginx      

5. **Set Up the Application**  
    - Navigate to the project directory on the EC2 instance.  
    - Install dependencies (e.g., `npm install` for Node.js projects).  
    - Configure environment variables if required.

6. **Start the Application**  
    - Run the application using a process manager like `pm2` or `screen`:  
      ```bash
      npm start  # Example for Node.js
      ``` 

      eg npm run build

7. **Configure Reverse Proxy (Optional)**  
    - Install and configure Nginx or Apache as a reverse proxy to serve the application.  
    - Update the Nginx configuration file to point to your application.

    - start nginx:
        sudo systemctl start nginx
        sudo systemctl enable nginx

        copy code from dist(build files) to nginx http server which is at /var/www/html or for redhat its at /usr/share/nginx/html

        sudo scp -r dist/* /usr/share/nginx/html - copies bundled project files in dist to
         the server of nginx on the remote instance

         enable port:80 on your instance, AWS blocks all PORTS by default

         Possible by: Instance - security - security group - inbound rules

8. **Test the Deployment**  
    - Access the application using the EC2 instance's public IP or domain name.  
    - Verify that the application is running as expected.

9. **Set Up a Domain Name (Optional)**  
    - Use Route 53 or another DNS provider to point your domain to the EC2 instance.

10. **Enable HTTPS (Optional)**  
     - Install and configure SSL certificates using Let's Encrypt or another provider.



 Signup on AWS

 Launch instance

 chmod 400 ‹secret>.pem

ssh -i "devTinder_fullstack.pem" ubuntu@ec2-13-50-112-178.eu-north-1.compute.amazonaws.com

install Node version 16.17.0

Git clone our project using https url

npm install → dependencies install

npm run build - creates dist etc

sudo apt update or sudo yum update for redhat

sudo yum install nginx - for redhat


sudo systemctl start nginx

sudo systemctl enable nginx

 Copy code from dist(build files) to /var/www/html/ or /usr/share/nginx/html for redhat

 sudo scp -r dist/* /usr/share/nginx/html

 Enable port:80 of your instance


 Backend:

Enable port:7777 of your instance 

 PM2 is a daemon process manager that will help you manage and keep your application online 24/7

 since you cant keep terminal open with nap start running all the tme, we use PM2

 install it on your remote instance

 npm install pm2 -g

 after installation for starting your app use "pm2 start npm -- start"

 pm2 start npm -- scriptToRun -> generic

    eg: pm2 start devTinder_BACKEND -- start

 pm2 list - get list of processes running

 pm2 stop npm - stop the process 
    pm2 stop "name_of_process" - generic

    eg: pm2 stop devTinder_BACKEND

pm2 delete npm - delete the process
    pm2 delete "name_of_process" - generic

 to check the logs: use "pm2 logs"

 to clear the logs: use "pm2 flush npm" 
        "pm2 flush name_of_app" - generic

to give a custom name to a process instead of default you use:

    pm2 start npm --name "custom_Name" -- start



Integrating FE & BE:

    BackEnd: http://13.50.112.178:7777/

    FrontEnd: http://13.50.112.178/

    Domain Name = devTinder.com 

    DNS Mapping of devTinder.com to 13.50.112.178,
    then
        FrontEnd: devTinder.com

        BackEnd: devTinder.com/7777 can be mapped to devTinder.com/api

        Port can be mapped to /api or anthing using nginx proxy_pass

        Proxy_pass configuration  done by:

            sudo nano /etc/nginx/sites-available/default

            To configure Nginx to mask port 7777 as /api, you need to update the Nginx configuration file. Here's how you can do it:

Steps to Configure Nginx:
Open the Nginx Configuration File:
sudo nano /etc/nginx/sites-available/default

Update the Configuration: Add a location block to proxy requests from /api to your backend running on port 7777.

server {
    listen 80;
    server_name devTinder.com; // or the ip address instead of devTinder.com

    location / {
        root /usr/share/nginx/html; # Path to your frontend build files
        index index.html;
        try_files $uri /index.html;
    }

    location /api/ {
        proxy_pass http://localhost:7777/; # Backend running on port 7777
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

Test the Nginx Configuration: Run the following command to ensure there are no syntax errors:

sudo nginx -t

Restart Nginx:
 Apply the changes by restarting Nginx:
    sudo systemctl restart nginx

Update Security Group (if necessary): 
Ensure port 80 is open in your AWS EC2 instance's security group to allow HTTP traffic