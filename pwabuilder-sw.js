const CACHE = "pwabuilder-offline-page";
const offlineFallbackPage = "/offline.html";

// Verificar se o Workbox foi carregado corretamente
if (typeof workbox !== 'undefined') {
  console.log('Workbox carregado com sucesso!');

  // Habilitar pré-carregamento de navegação, se suportado
  if (workbox.navigationPreload.isSupported()) {
    workbox.navigationPreload.enable();
    console.log('Navigation Preload habilitado.');
  }

  // Registrar rota para todas as solicitações
  workbox.routing.registerRoute(
    new RegExp('/*'),
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: CACHE,
    })
  );
} else {
  console.error('Workbox não foi carregado corretamente.');
}

// Mensagem para pular a espera (útil para atualizações do Service Worker)
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
    console.log('Service Worker atualizado e skipWaiting executado.');
  }
});

// Instalação do Service Worker
self.addEventListener('install', async (event) => {
  console.log('Service Worker instalando...');
  event.waitUntil(
    caches.open(CACHE)
      .then((cache) => {
        console.log('Cache aberto, adicionando página offline.');
        return cache.add(offlineFallbackPage);
      })
      .catch((error) => {
        console.error('Falha ao adicionar página offline ao cache:', error);
      })
  );
});

// Interceptar solicitações de navegação
self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    console.log('Solicitação de navegação detectada:', event.request.url);
    event.respondWith((async () => {
      try {
        const preloadResp = await event.preloadResponse;

        if (preloadResp) {
          console.log('Resposta pré-carregada encontrada.');
          return preloadResp;
        }

        const networkResp = await fetch(event.request);
        console.log('Resposta da rede obtida:', networkResp);
        return networkResp;
      } catch (error) {
        console.error('Erro ao buscar recurso da rede:', error);

        const cache = await caches.open(CACHE);
        const cachedResp = await cache.match(offlineFallbackPage);
        if (cachedResp) {
          console.log('Exibindo página offline.');
          return cachedResp;
        } else {
          console.error('Página offline não encontrada no cache.');
          return new Response('Offline - Sem conexão', { status: 503, statusText: 'Offline' });
        }
      }
    })());
  }
});