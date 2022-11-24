import React from 'react'

const PeopleCom = ({ people }) => {
    const defaultImage = "https://cdn-icons-png.flaticon.com/512/149/149071.png";
    console.log("people", people)
    return (
        <div className='mt-4'>
            {people.map(user => 
                <div className='card m-1 p-3' key={user._id}>
                    <div className='d-flex align-items-center justify-content-between '>
                        <img
                            src={user.image && user.image.url ? user.image.url : defaultImage}
                            alt={user.name}
                            height={50}
                            width={50}
                            style={{ borderRadius: "50%" }} />
                        <h6 className='mt-2'>{user.name}</h6>
                        <button className='btn btn-primary'>Follow</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default PeopleCom