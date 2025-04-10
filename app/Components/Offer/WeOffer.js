import { IconMoneybag } from "@tabler/icons-react"
import Image from "next/image"

function WeOffer (){

    return (
        <div> 
        <div className="grid grid-cols-2 gap-3">
        <div>
            <Image src="/cuate.png"  alt="no image"/>
        </div>
        <div>
            <p className="text-[#4b93dd] capitalize text-xs bg-[#e8f1fb] rounded-md">Why Choose Us</p>
            <div>
                <h1>We offer the best exprience with our rental deals</h1>
            </div>
            <div>
                <div>
                    <IconMoneybag /> 
                    <div>
                        <h1>Best price guaranteed</h1>
                        <p> find a lower price? we'll refund you 100% of the difference</p>
                    </div>
                </div>
                <div>
                    <IconMoneybag /> 
                    <div>
                        <h1>Best price guaranteed</h1>
                        <p> find a lower price? we'll refund you 100% of the difference</p>
                    </div>
                </div>
                <div>
                    <IconMoneybag /> 
                    <div>
                        <h1>Best price guaranteed</h1>
                        <p> find a lower price? we'll refund you 100% of the difference</p>
                    </div>
                </div>
            </div>
        </div>
        </div>
        
        </div>
    )
}

export default WeOffer