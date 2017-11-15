const sweetAlert = (typeof window !== 'undefined' && typeof document !== 'undefined')  ?
  require('sweetalert') : () => {};

export function noMetaMaskAlert() {
  sweetAlert({
    title: 'Warning',
    text: '<b>You need <a href="https://metamask.io/">MetaMask</a> browser plugin to run this ' +
    'contract</b>',
    html: true,
    type: 'warning',
  });
}


export default {
  noMetaMaskAlert,
};
