
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs"; 

const createClient = () => {
  return createPagesBrowserClient();
};

export default createClient;
