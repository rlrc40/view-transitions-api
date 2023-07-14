const checkIsNavigationSupported = () => Boolean(document.startViewTransition);

const fetchPage = async (url: string) => {
    const response = await fetch();
    const text = await response.text();

    const [, data] = text.match(/<body[^>]*>(.*?)<\/body>/is);

    return data;
}

export const startViewTransition = () => {
    if (!checkIsNavigationSupported()) return;

    window.navigation.addEventListener('navigate', (event) => {
    
        const toUrl = new URL(event.destination.url)
    
        if (location.origin !== toUrl.origin) return;

        const data = await fetchPage(toUrl.pathname);
    
        event.intercept({
            async handler () {
        
                document.startViewTransition(() => {
        
                document.body.innerHTML = data;
        
                document.documentElement.scrollTop = 0;
                });
            }
        });
    })
}