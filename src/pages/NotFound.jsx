import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-center text-white px-4">
            <h1 className="text-8xl font-extrabold text-yellow-400 mb-2">404</h1>
            <p className="text-2xl font-semibold mb-3">Oops! Page Not Found</p>
            <p className="text-gray-400 mb-8 max-w-sm">
                Looks like this artwork got lost in the gallery.
            </p>

            <button
                onClick={() => navigate("/")}
                className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-6 py-2 rounded-full shadow-md transition"
            >
                Back to Artify
            </button>
        </div>
    );
}


export default NotFound;