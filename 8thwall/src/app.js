const onxrloaded = () => {
  XR8.XrController.configure({
    imageTargetData: [
      require('../image-targets/tarjeta_profesional_tobon-1.json'),
      require('../image-targets/tarjeta_profesional_tobon.json'),
      require('../image-targets/targetimage.json'),
    ],
  })
}
window.XR8 ? onxrloaded() : window.addEventListener('xrloaded', onxrloaded)