import React from 'react';
import axios from 'axios';


const PremiumUser = () => {
    const handlePurchase = async type => {
        const order = await axios.post(
            BASE_URL + "/payment/create",
            {
                membershipType: type
            },
            {wthCredentials: true}
        );

        const {amount, keyId, currency, notes, orderId} = order.data;

        const options = {
            key: keyId,
            amount, currency, 
            name: "Dev Tinder UI", 
            description: "Connect to other devs",
            order_id: orderId,
            prefill: {
                name: notes.firstName + " " + notes.lastName,
                email: notes.emailId,
                contact: "9393898135"
            },
            theme: {
                color: "#FE7254"
            }
        };

        //open payment dialog box
        const rzp = new window.Razorpay(options);//we get access to it throgh script tag in index.html

        rzp.open();

    }

    return (
        <div className='m-10'>
            <div className="flex w-full">
                <div className="card bg-base-300 rounded-box grid h-80 grow place-items-center">
                    <h1 className='font-bold text-3xl'>Silver Membership</h1>
                    <ul>
                        <li> - Chat with other people</li>
                        <li> - 100 connection requests per day</li>
                        <li> - Blue tick</li>
                        <li> - 3 months</li>
                    </ul>
                    <button onClick={() => handlePurchase("silver")} className='btn btn-secondary'>Buy Silver</button>
                </div>
                <div className="divider divider-horizontal">OR</div>
                <div className="card bg-base-300 rounded-box grid h-80 grow place-items-center">
                    <h1 className='font-bold text-3xl'>Gold Membership</h1>
                    <ul>
                        <li> - Chat with other people</li>
                        <li> - Unlimited connection requests per day</li>
                        <li> - Blue tick</li>
                        <li> - 6 months</li>
                    </ul>
                    <button onClick={() => handlePurchase("gold")} className='btn btn-primary'>Buy Gold</button>
                </div>
            </div>
        </div>
    )
}

export default PremiumUser