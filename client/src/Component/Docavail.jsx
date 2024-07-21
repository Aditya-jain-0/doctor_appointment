import React from 'react'

const Docavail = ({ docid, isavailable }) => {
    const changestatus = ()=>{

    }
    return (
        <>
            {isavailable ?
                <>
                    <button className='a'>
                        Available
                    </button>
                    <button className='b' onClick={() => changestatus(docid)}>
                        Not Available
                    </button>
                </>
                :
                <>
                    <button className='b'>
                        Available
                    </button>
                    <button className='a' onClick={() => changestatus(docid)}>
                        Not Available
                    </button>
                </>
            }
        </>
    )
}

export default Docavail