interface SvgProps {
    width: string,
    height: string
}

export const Logo = ({width,height}: SvgProps) => {
    return (

	<svg width={width} height={height}  xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 100 100">


    <defs>
        <g id="background">
<path fill="url(#background-gradient)" stroke="none" d=" M 0 100 L 100 100 100 0 0 0 0 100 Z"/>
</g><mask id="mask">
<path fill="#FFFFFF" stroke="none" d=" M 0 100 L 100 100 100 0 0 0 0 100 Z"/>
</mask><g id="middle-1">
<path fill="#000000" fillOpacity="0.1" stroke="none" d=" M 77.1 14.9 Q 64.1 11.1 50 11.1 21.8 11.1 0 25.2 L 0 100 100 100 100 25.2 Q 89.7 18.5 77.1 14.9 Z"/>
</g>
        
<linearGradient id="background-gradient" x1="0" y1="0" y2="1" x2="0" >
    <stop stopColor="#b840ff" offset="0%"/>
    <stop stopColor="#0095ff" offset="100%"/>
</linearGradient>

        
        
        <g transform="scale(3.5714285714285716) translate(-0.7499990463256836 -1)" id="picture"><path d="M18.8 9c-.8 0-1.5.7-1.5 1.5v4.9c.2.6.3 1.3.2 1.9.3.4.7.7 1.3.7.8 0 1.5-.7 1.5-1.5v-6c0-.8-.7-1.5-1.5-1.5zM5.3 5.8l3.1 10.6 7.8-1.3V2.5c0-.8-.7-1.5-1.5-1.5-.7 0-1.5.8-1.5 1.6v10.6c0 .4-.3.8-.7.8-.4.1-.8-.1-.9-.5L7.9 4.9c-.1-.4-.4-.7-.8-.8-.4-.1-.8-.1-1.1.1-.6.4-.8 1-.7 1.6zm11.2 3.8zm8.2 9.5zM22.8 11c-.8 0-1.5.7-1.5 1.5v5c0 .8.7 1.5 1.5 1.5s1.5-.7 1.5-1.5v-5c0-.8-.7-1.5-1.5-1.5zm-6.1-1.8z M6.8 23.1c.4 2.1 2 4.1 4.1 5.2 1 .5 2.1.7 3.2.7h2.8c4.1 0 7.4-3.3 7.4-7.4v-2.1c-.4.3-.9.5-1.5.5-1.1 0-2-.7-2.3-1.6-.4.4-1 .6-1.7.6-.6 0-1.2-.2-1.6-.6-.4.8-1.1 1.4-1.9 1.7l-2.7 1c-.1 0-.2.1-.3.3-.1.1 0 .3 0 .4l.8 1.5c.1.2 0 .5-.2.7-.1 0-.1.1-.2.1-.2 0-.4-.1-.4-.3l-.8-1.5c-.2-.4-.2-.8-.1-1.2s.5-.7.9-.8l2.7-1c.6-.2 1.1-.7 1.4-1.3.1-.1.1-.3.1-.4-.1-.3-.2-.6-.2-1v-.4l-8.2 1.4c-1 .2-1.8 1.2-1.8 2.3v.4l.5 2.8z"/></g>
        
<linearGradient id="picture-gradient" x1="0" y1="0" y2="1" x2="0" >
    <stop stopColor="#ffffff" offset="0%"/>
    <stop stopColor="#e5eff9" offset="100%"/>
</linearGradient>

    </defs>

    

        <use xlinkHref="#background" fill="url(#background-gradient)" />

    <use xlinkHref="#middle-1" />

        <g mask="url(#mask)">
            <g transform="
                    translate(
                            50 50
)
                        translate(0 0)  scale(0.7500000000000002)  
                        translate(
                            -50 -50
)">
                    <use xlinkHref="#picture" fill="url(#picture-gradient)"  />
            </g>
        </g>

    



</svg>

    )
}