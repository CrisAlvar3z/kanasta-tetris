import { useState } from 'react'

const ShareButton = () => {

  const [dialogOpen, setDialogOpen] = useState(false);
  const [url, setUrl] = useState('');
  
  const copyToClipboard = () => {
    setUrl(window.location.href);
    navigator.clipboard.writeText(window.location.href)
      .then(() => showDialog())
      .catch(err => console.error('Error al copiar la URL: ', err));
  };

  const showDialog = () => {
    setDialogOpen(true);
  }

  return (
  <>
      <button className="bg-teal-500 w-fit p-4 rounded text-white hover:bg-teal-700 cursor-pointer" onClick={copyToClipboard} >
        Compartir
      </button>

      <dialog className="drop-shadow-lg p-10 m-auto" open={dialogOpen}>
        <div className="flex flex-col gap-4">
          <h2 className="text-xl">URL copiada al portapapeles</h2>
          <input type="text" value={url} readOnly className="p-2 rounded border border-gray-300" />
          <button className="bg-teal-500 w-fit p-4 rounded text-white hover:bg-teal-700 cursor-pointer" onClick={() => setDialogOpen(false)}>
            Cerrar
          </button>
        </div>
      </dialog>
  </>
  )
}

export default ShareButton