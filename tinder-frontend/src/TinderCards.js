import React, { useState,useEffect } from 'react'
import TinderCard from 'react-tinder-card'
import './TinderCard.css'
import axios from './axios'

function TinderCards() {
    const [people, setPeople] = useState([
        // {
        //     name: "Elon Musk",
        //     url: "https://upload.wikimedia.org/wikipedia/commons/8/85/Elon_Musk_Royal_Society_%28crop1%29.jpg"
        // },
        // {
        //     name: "Kartik Aryan",
        //     url: "https://upload.wikimedia.org/wikipedia/commons/7/78/Kartik_Aaryan_in_2018.jpg"
        // },
        // {
        //     name: "MS Dhoni",
        //     url: "https://assets.gqindia.com/photos/5e8485a922867b0008960729/1:1/w_1080,h_1080,c_limit/MS-Dhoni-net-worth.jpg"
        // },
        // {
        //     name: "Virat Kohli",
        //     url: "https://i.pinimg.com/originals/a3/fb/5d/a3fb5def518705c9cc739299234c2779.jpg"
        // }
    ])
    useEffect(()=>{
        async function fetchData(){
            const req=await axios.get('/tinder/cards')
            setPeople(req.data)
        }
        fetchData()
    },[])

 

    const swiped=(direction,nameToDelete)=>{
        console.log("removing: ",+nameToDelete);
        // setLastDirection(direction)
    }

    const outOfFrame=(name)=>{
        console.log(name+"left the screen")
    }
    return (
        <div className="tinderCards">
            <div className="tinderCards__cardContainer">
                {
                    people.map(person => (
                        <TinderCard
                            className="swipe"
                            key={person.name}
                            preventSwipe={["up","down"]}
                            onSwipe={(dir)=>swiped(dir,person.name)}
                            onCardLeftScreen={()=>outOfFrame(person.name)}
                        >
                        <div style={{backgroundImage:`url(${person.imgUrl})`}}
                            className="card"
                        >
                        <h3>{person.name}</h3>
                        </div>
                        </TinderCard>
                    ))}
            </div>

        </div>
    )
}

export default TinderCards
