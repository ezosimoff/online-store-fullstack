class ApiError extends Error {
    constructor (status, massage) {
        super()
        this.status = status
        this.massage = massage
    }

    static badRequest(massage) {
        return new ApiError(400, massage)
    }
    static internal(massage) {
        return new ApiError(500, massage)
    }
    static forriben(massage) {
        return new ApiError(403, massage)
    } 
}

module.exports = ApiError