import React, {useState, useEffect} from 'react'
import {databases, DATABASE_ID, COLLECTION_ID, client} from '../appwriteConfig'
import { ID, Query, Role, Permission } from "appwrite";
import {Trash2} from 'react-feather';
import Header from '../components/Header';
import { useAuth } from '../utils/AuthContext';

const Room = () => {

    const {user} = useAuth();

    const [messages, setMessages] = useState([]);
    const [messageBody, setMessageBody] = useState("");

    useEffect(() => {
        getMessages();
      
        const unsubscribe = client.subscribe(`databases.${DATABASE_ID}.collections.${COLLECTION_ID}.documents`, response => {

            if(response.events.includes("databases.*.collections.*.documents.*.create")){
                console.log('A MESSAGE WAS CREATED')
                setMessages(prevState => [response.payload, ...prevState])
            }

            if(response.events.includes("databases.*.collections.*.documents.*.delete")){
                console.log('A MESSAGE WAS DELETED!!!')
                setMessages(prevState => prevState.filter(message => message.$id !== response.payload.$id))
            }
        });

        console.log('unsubscribe:', unsubscribe)
      
        return () => {
          unsubscribe();
        };
      }, []);

    const getMessages = async () => {
        const response = await databases.listDocuments(
            "66eb7e66000785de8506",
            "66eb7e8b003b890a02da",
            [
                Query.orderDesc("$createdAt"),
                Query.limit(100)
            ]
        )
        console.log(response.documents);
        setMessages(response.documents);
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        let payload = {
            user_id: user.$id,
            username: user.name,
            body: messageBody
        }

        let permissions = [
            Permission.write(Role.user(user.$id))
        ]

        let response = await databases.createDocument(
            '66eb7e66000785de8506',
            '66eb7e8b003b890a02da',
            ID.unique(),
            payload,
            permissions
        );

        console.log(response);
        // setMessages(prevState => [response, ...messages]);

        setMessageBody("");
        
    }

    const deleteMessage = async (message_id) => {
        
        databases.deleteDocument(
            '66eb7e66000785de8506', // databaseId
            '66eb7e8b003b890a02da', // collectionId
            message_id // documentId
        );
        setMessages(messages.filter((message) => message.$id !== message_id));
        // console.log(message_id);
    }


  return (
    <main className='container'>

    <Header/>
    <div className='room--container'>
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

            <div>
                {
                    messages.map(message => (
                        <div key={message.$id} className='message--wrapper'>

                            <div className='message--header'>
                                <p>
                                    {
                                        message?.username?(
                                            <span>{message.username}</span>
                                        ):(
                                            <span>Anonymous User</span>
                                        )
                                    }
                                    <small className='message-timestamp'>{new Date(message.$createdAt).toLocaleString()}</small>
                                </p>
                                
                                
                                {message.$permissions.includes(`delete(\"user:${user.$id}\")`) && (
                                    <Trash2 
                                        className='delete--btn'
                                        onClick={() => {deleteMessage(message.$id)}}
                                    />
                                )}
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
