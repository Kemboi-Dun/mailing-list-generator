import axios from "axios";
import { create } from "zustand";

interface EmailState {
  emails: { email: string }[];
  word_emails: string[];
  get_emails: () => void;
}

const useEmailStore = create<EmailState>()((set) => ({
  emails: [],
  word_emails: [],
  get_emails: async () => {
    const url = "";
    try {
      const response = axios.get(url);

      const test_data = [
        " linden.copeland@gmail.com",
        "x98nzphw9q3eb79z7z@hotmail.com",
        "mika.benjamin@aol.com",
        "z6utvq19x0b8zanhfhby@comcast.net",
        "zach.bradley@ymail.com",
        "5eitfw1krybv76kc5h@rediffmail.com",
        "lloyde.boyle@msn.com",
        "bp5nkuftgqw0d6@aol.com",
        "darryn.sellers@googlemail.com",
        "w4oryzp95r5cqkzk@aol.com",
        "rui.wooten@aol.com",
        "ore4dnw22k4xd@gmail.com",
        "jamey.hull@yahoo.com",
        "a3upj6tpro0r@aol.com",
        "nairn.benjamin@aol.com",
        "fcc0harjz866npj@googlemail.com",
        "aran.bailey@comcast.net",
        "ns33jibbx3xblpxvv@googlemail.com",
        "derron.nunez@ymail.com",
        "19vadzzojd7q13s56@comcast.net",
      ];

      const email_list = test_data.map((email: string) => {
        return {
          email: email,
        };
      });

      set({ emails: email_list });
      set({ word_emails: test_data });
    } catch (error) {
      console.error(error);
    }
  },
}));

export default useEmailStore;
