export default interface DataAccessValidation {
    (requestedEmail: string): Promise<void>;
}