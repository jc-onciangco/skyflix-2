import { useSelector, useDispatch } from 'react-redux'
import { toggleDarkmode } from '../../store/slices/darkmodeSlice'

const DarkmodeToggle = () => {
    const isDarkmode = useSelector(state => state.darkmode.isDarkmode)
    const dispatch = useDispatch()

    return (
        <>
            <div className="darkmode-container">
                <div onClick={() => dispatch(toggleDarkmode())} className="darkmode-toggle"></div>
            </div>
            <style jsx>
                {`
                
                    .darkmode-container {
                        width: 60px;
                        height: 30px;
                        background-color: rgba(0,0,0,0.2);
                        border-radius: 5px;
                        padding: 5px;
                    }

                    .darkmode-toggle {
                        height: 100%;
                        width: 25px;
                        border-radius: 3px;
                        background-color: white;
                        transform: translate(${isDarkmode? '100%' : '0'}, 0);
                        transition: 0.2s linear;
                        cursor: pointer;
                    }
                
                `}
            </style>
        </>
    )
}

export default DarkmodeToggle