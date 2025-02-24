// Registrar o Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/pwabuilder-sw.js')
      .then(registration => {
          console.log('Service Worker registrado com sucesso:', registration);

          // Verificar se há uma nova versão do Service Worker
          registration.addEventListener('updatefound', () => {
              const newWorker = registration.installing;
              console.log('Nova versão do Service Worker encontrada:', newWorker);

              newWorker.addEventListener('statechange', () => {
                  if (newWorker.state === 'installed') {
                      if (navigator.serviceWorker.controller) {
                          console.log('Nova versão do Service Worker instalada. Pronto para atualizar.');
                          // Enviar mensagem para pular a espera e ativar a nova versão
                          newWorker.postMessage({ type: 'SKIP_WAITING' });
                      }
                  }
              });
          });
      })
      .catch(error => {
          console.error('Falha ao registrar o Service Worker:', error);
      });
}

// Lidar com o evento beforeinstallprompt
window.addEventListener('beforeinstallprompt', event => {
  event.preventDefault();
  const installPrompt = event;

  // Verificar se o botão de instalação existe no DOM
  const installButton = document.getElementById('install-button');
  if (installButton) {
      // Adicionar o listener de clique ao botão
      installButton.addEventListener('click', () => {
          installPrompt.prompt(); // Mostrar o prompt de instalação
          installPrompt.userChoice.then(choice => {
              if (choice.outcome === 'accepted') {
                  console.log('Usuário aceitou a instalação');
              } else {
                  console.log('Usuário recusou a instalação');
              }
          });
      });
  } else {
      console.error('Elemento "install-button" não encontrado no DOM.');
  }
});

// Atualizar a página quando uma nova versão do Service Worker estiver ativa
let refreshing = false;
navigator.serviceWorker.addEventListener('controllerchange', () => {
  if (!refreshing) {
      console.log('Nova versão do Service Worker ativa. Recarregando a página...');
      window.location.reload();
      refreshing = true;
  }
});


var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(){
var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
s1.async=true;
s1.src='https://embed.tawk.to/67bc48d5578a2b1907cfaedf/1ikrnp10h';
s1.charset='UTF-8';
s1.setAttribute('crossorigin','*');
s0.parentNode.insertBefore(s1,s0);
})();
