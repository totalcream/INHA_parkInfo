import { createContext, useContext} from 'react'
import { Store } from './Store'

let store;
export const StoreContext = createContext();

export function useSotre() {
    const context = useContext(StoreContext)
    if ( context === undefined) {
        throw new Error('useStore must be used within StoreProvider')
    }
    return context
};

export function StoreProvider({ children, initialState: initialData}) {
    const store = initializeStore(initialData)

    return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
};

function initializeStore(initialData = null) {
    const _store = store ?? new Store()
      //  데이터를 가져오는 메서드가 있는 경우 여기에서 hydrate 됨. 
    if (initialData) {
      _store.hydrate(initialData)
    }
    // ssr과 ssg는 항상 새로운 store를 생성
    if (typeof window === 'undefined') return _store
    // 클라이언트에서 한번 store를 생성
    if (!store) store = _store
  
    return _store
}