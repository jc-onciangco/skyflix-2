import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner} from '@fortawesome/free-solid-svg-icons'

const LoadingIcon = ({size}) => {
    return (
    <div className="flex justify-center">
        <div className={`loading-icon h-[${size}] aspect-square animate-spin`}>
            <FontAwesomeIcon icon={faSpinner} color="#DFAE14" height={'100%'} />
        </div>
    </div>
    )
}

export default LoadingIcon