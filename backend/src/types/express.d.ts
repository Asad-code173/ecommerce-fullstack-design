import type { UserDocument } from "./User.ts";
declare global{
    namespace Express{
        interface Request{
            user?:UserDocument
        }
    }
}
export {}