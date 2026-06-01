import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, Address } from '../types';

interface AuthStore {
  user: User | null;
  users: User[];
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string) => boolean;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  addAddress: (address: Omit<Address, 'id'>) => void;
  updateAddress: (id: string, data: Partial<Address>) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      users: [],
      login: (email, _password) => {
        const u = get().users.find((u) => u.email === email);
        if (u) {
          set({ user: u });
          return true;
        }
        return false;
      },
      register: (name, email, _password) => {
        if (get().users.find((u) => u.email === email)) return false;
        const newUser: User = {
          id: Date.now().toString(36),
          name,
          email,
          phone: '',
          addresses: [],
        };
        set({ users: [...get().users, newUser], user: newUser });
        return true;
      },
      logout: () => set({ user: null }),
      updateProfile: (data) => {
        const user = get().user;
        if (!user) return;
        const updated = { ...user, ...data };
        set({
          user: updated,
          users: get().users.map((u) => (u.id === user.id ? updated : u)),
        });
      },
      addAddress: (addr) => {
        const user = get().user;
        if (!user) return;
        const newAddr: Address = { ...addr, id: Date.now().toString(36) };
        const updated = { ...user, addresses: [...user.addresses, newAddr] };
        set({
          user: updated,
          users: get().users.map((u) => (u.id === user.id ? updated : u)),
        });
      },
      updateAddress: (id, data) => {
        const user = get().user;
        if (!user) return;
        const updated = {
          ...user,
          addresses: user.addresses.map((a) =>
            a.id === id ? { ...a, ...data } : a
          ),
        };
        set({
          user: updated,
          users: get().users.map((u) => (u.id === user.id ? updated : u)),
        });
      },
    }),
    { name: 'runhe-auth' }
  )
);
