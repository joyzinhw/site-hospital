if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('Service Worker registrado com sucesso:', registration);
      })
      .catch(error => {
        console.log('Falha ao registrar o Service Worker:', error);
      });
  }


  window.addEventListener('beforeinstallprompt', event => {
    event.preventDefault();
    const installPrompt = event;
    // Mostrar um botão ou modal para o usuário instalar o app
    document.getElementById('install-button').addEventListener('click', () => {
      installPrompt.prompt();
      installPrompt.userChoice.then(choice => {
        if (choice.outcome === 'accepted') {
          console.log('Usuário aceitou a instalação');
        } else {
          console.log('Usuário recusou a instalação');
        }
      });
    });
  });