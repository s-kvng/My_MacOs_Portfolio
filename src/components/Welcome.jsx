import {useRef} from "react";
import {gsap} from "gsap";

const FONT_WEIGHT = {
    subtitle: {min: 100, max: 400 , default: 100},
    title : {min: 400, max: 900 , default: 400},
}

const renderText = (text, className , baseWeight = 400) => {
    return [...text].map((char, i) => (
        <span className={className} key={i} style={{ fontVariationSettings: `'whgt ${baseWeight}`}}>
            {char === " " ? "\u00A0" : char}
        </span>
    ))
}

const setupTextHover = (container, type) => {
    if(!container) return;

    const letters = container.querySelectorAll("span")
    const {min , max , default: base} = FONT_WEIGHT[type]

    const animateLetter = (letter, weight, duration) =>{
        return gsap.to(letter, {
            duration,
            ease: "power2.out",
            fontVariationSettings: `'whgt ${weight}`
        })
    };

    const handleMouseMove = (e) => {
        const { left } = container.getBoundingClientRect();
        const mouseX = e.clientX - left

        letters.forEach(letter => {
            const {left: l , width: w} = letter.getBoundingClientRect();
            const distance = Math.abs(mouseX - (l - left + w/2));
            const intensity = Math.exp(-(distance ** 2)/ 2000)
        })
    }
}

const Welcome = () => {
    const titleRef = useRef(null)
    const subtitleRef = useRef(null)
    return (
       <section id="welcome">
           <p ref={subtitleRef}>
               {renderText("Hey, I'm Nathan! Welcome to my",
                   "text-3xl font-georama", 100)}
           </p>
           <h1 ref={titleRef}>
               {renderText("portfolio", "text-9xl italic font-georama")}
           </h1>

           <div className="small-screen">
               <p>This Portfolio is designed for </p>
           </div>
       </section>
    )
}
export default Welcome
