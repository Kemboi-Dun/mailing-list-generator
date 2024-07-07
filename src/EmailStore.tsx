import { create } from "zustand";

interface EmailState {
  emails: { email: string }[];
  word_emails: string[];

  set_emails: (emails: string[]) => void;
  set_word_emails: (emails: string[]) => void;
}

const useEmailStore = create<EmailState>()((set) => ({
  emails: [],
  word_emails: [],

  set_emails: (emails) => {
    const email_list = emails.map((email: string) => {
      return {
        email: email,
      };
    });
    set({ emails: email_list });
  },
  set_word_emails: (emails) => {
    set({ word_emails: emails });
  },
}));

export default useEmailStore;
