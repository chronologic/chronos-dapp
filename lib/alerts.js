import { NETWORK_MESSAGES } from './consts';

const sweetAlert = (typeof window !== 'undefined' && typeof document !== 'undefined') ?
  require('sweetalert') : async () => {};

export function showError(text) {
  return sweetAlert({
    title: 'Error',
    text,
    icon: 'error',
  });
}

export function showInfo(title, text) {
  return sweetAlert({
    title,
    text,
    icon: 'info',
  });
}

export function showNoMetaMaskAlert() {
  return sweetAlert({
    title: 'Warning',
    content: '<b>You need <a href="https://metamask.io/">MetaMask</a> browser plugin to run this ' +
    'contract</b>',
    html: true,
    icon: 'warning',
  });
}

export function showNetworkInfo(networkId) {
  return sweetAlert({
    title: 'Web3 Connected',
    text: NETWORK_MESSAGES[networkId] || NETWORK_MESSAGES.default,
    icon: 'warning',
  });
}

export function confirmFeeWithdraw() {
  return sweetAlert({
    title: 'DAY Tokens needed',
    text: 'Please allow us to reserve 100 day tokens as fee',
    buttons: true,
  });
}

export default {
  confirmFeeWithdraw,
  showError,
  showInfo,
  showNetworkInfo,
  showNoMetaMaskAlert,
};
