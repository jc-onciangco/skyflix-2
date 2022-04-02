import { CircularProgressbar , buildStyles  } from 'react-circular-progressbar';
const ProgressCircle = ({value}) => {
    return (
    <div className="relative h-[3rem] sm:h-[3.50rem] lg:h-16 aspect-square bg-yellow-500 rounded-full p-1">
        <div className="value absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 text-white font-extrabold font-sans text-base lg:text-2xl">{value*10}<sup className="text-xs">%</sup></div>
        <CircularProgressbar 
            strokeWidth={8} 
            value={66}
            styles={{
                // Customize the root svg element
                root: {},
                // Customize the path, i.e. the "completed progress"
                path: {
                  // Path color
                  stroke: `#F6F525`,
                  // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                  strokeLinecap: 'round',
                  // Customize transition animation
                  transition: 'stroke-dashoffset 0.5s ease 0s',
                  // Rotate the path
                  transformOrigin: 'center center',
                },
                // Customize the circle behind the path, i.e. the "total progress"
                trail: {
                  // Trail color
                  stroke: 'rgba(246, 245, 37, 0.4)',
                  // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                  strokeLinecap: 'butt',
                  // Rotate the trail
                  transform: 'rotate(0.25turn)',
                  transformOrigin: 'center center',
                }
              }} />
    </div>
    )
}

export default ProgressCircle