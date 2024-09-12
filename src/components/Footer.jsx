import React from 'react'
import { Row, Col } from 'react-bootstrap'

function Footer() {
  return (
    <>
        <div className='p-5'>
            <Row>
                <Col>
                    <h3>About</h3>
                    <p style={{textAlign:'justify'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam molestias maxime eius repellat ex inventore iusto earum debitis quaerat, nisi voluptatem, rem tempora quae culpa sunt. Voluptatem eveniet iure eum.</p>
                </Col>
                <Col>
                    <h3>Feedback</h3>
                    <input type="text" className='form-control mb-3'/>
                    <button className='btn btn-dark'>Send</button>
                </Col>
            </Row>
        </div>
    </>
  )
}

export default Footer