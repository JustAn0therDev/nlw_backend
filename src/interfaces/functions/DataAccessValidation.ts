export default interface DataAccessValidation {
    (requestedEmail: String): Promise<void>;
}