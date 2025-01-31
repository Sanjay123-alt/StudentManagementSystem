const Loading = () => {
    return (
        <div role="status" className="p-4 border border-gray-200 rounded shadow-sm animate-pulse">
            {/* Header Section */}
            <div className="flex justify-between mb-4">
                <div className="h-6 bg-gray-300 rounded-full w-40"></div>
                <div className="h-8 bg-gray-300 rounded w-24"></div>
            </div>
            
            {/* Table Header */}
            <div className="grid grid-cols-4 gap-4 border-b pb-2">
                <div className="h-4 bg-gray-300 rounded w-24"></div>
                <div className="h-4 bg-gray-300 rounded w-32"></div>
                <div className="h-4 bg-gray-300 rounded w-40"></div>
                <div className="h-4 bg-gray-300 rounded w-16"></div>
            </div>

            {/* Table Rows */}
            {[...Array(3)].map((_, index) => (
                <div key={index} className="grid grid-cols-4 gap-4 py-3 border-b">
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                    <div className="h-4 bg-gray-200 rounded w-32"></div>
                    <div className="h-4 bg-gray-200 rounded w-40"></div>
                    <div className="flex space-x-2">
                        <div className="h-8 bg-gray-300 rounded w-12"></div>
                        <div className="h-8 bg-gray-300 rounded w-12"></div>
                    </div>
                </div>
            ))}
            <span className="sr-only">Loading...</span>
        </div>
    );
};

export default Loading;