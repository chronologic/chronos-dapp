import ReactDOM from 'react-dom';
import { NETWORK_MESSAGES } from './consts';

const sweetAlert = (typeof window !== 'undefined' && typeof document !== 'undefined') ?
  require('sweetalert') : async () => {};

const sweetAlertContainer = (typeof window !== 'undefined' && typeof document !== 'undefined') ?
  document.createElement('div') : async () => {};

export function showError(text) {
  return sweetAlert({
    title: 'Error',
    text,
    icon: 'error',
  });
}

export function showInfo(title, text) {
  return sweetAlert({
    title:title,
    text:text,
    icon: 'info',
  });
}

export function showNoMetaMaskAlert() {
  var content = ReactDOM.render(<b>You need <a href="https://metamask.io/" target="_blank">MetaMask</a> browser plugin to run this
  Dapp</b>,sweetAlertContainer);
  return sweetAlert({
    title: 'Warning',
    content: content,
    icon: 'error',
  });
}

export function showNoMetaMaskAccountsAlert() {
  var content = ReactDOM.render(<b>Metamask has no Accounts or is Locked. Kindly create and unlock your account to proceed.</b>,sweetAlertContainer);
  return sweetAlert({
    title: 'No Accounts',
    content: content,
    icon: 'warning'
  });
}

export function showNetworkInfo(networkId) {
  return sweetAlert({
    title: 'Web3 Connected',
    text: NETWORK_MESSAGES[networkId] || NETWORK_MESSAGES.default,
    icon: 'info',
  });
}

export function confirmFeeWithdraw(amt) {
  return sweetAlert({
    title: 'DAY Tokens needed',
    text: 'Please allow us to reserve '+amt/(1e+18)+' day tokens as fee',
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
