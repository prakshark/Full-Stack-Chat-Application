import React, {useState, useEffect} from 'react'
import {databases} from '../appwriteConfig'
import { ID, Query } from "appwrite";

const Room = () => {

    const [messages, setMessages] = useState([]);
    const [messageBody, setMessageBody] = useState("");

    useEffect(() =>{
        getMessages();
    }, []);

    const getMessages = async () => {
        const response = await databases.listDocuments(
            "66eb7e66000785de8506",
            "66eb7e8b003b890a02da",
            [
                Query.orderDesc("$createdAt"),
                Query.limit(5)
            ]
        )
        console.log(response.documents);
        setMessages(response.documents);
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        let payload = {
            body: messageBody
        }

        let response = await databases.createDocument(
            '66eb7e66000785de8506',
            '66eb7e8b003b890a02da',
            ID.unique(),
            payload
        );

        console.log(response);
        setMessages([response, ...messages]);

        setMessageBody("");
        
    }


  return (
    <main className='container'>

        <form id = 'message--form' onSubmit={handleSubmit}>
                <div>
                    <textarea
                        required
                        maxLength="1000"
                        placeholder='Your Message Here'
                        onChange={(e) => {setMessageBody(e.target.value)}}
                        value={messageBody}>

                    </textarea>
                </div>

                <div className='send-btn--wrapper'>
                    <input type="submit" value="Send" className='btn btn--secondary' />
                </div>
        </form>

        <div className='room--container'>
            <div>
                {
                    messages.map(message => (
                        <div key={message.$id} className='message--wrapper'>

                            <div className='message--heaedr'>
                                <small className='message-timestamp'>{message.$createdAt}</small>
                            </div>

                            <div className='message--body'>
                                <span>{message.body}</span>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>

    </main>
  )
}

export default Room
