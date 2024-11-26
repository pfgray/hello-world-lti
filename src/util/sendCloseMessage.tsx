export const sendCloseMessage = function () {
  (window.opener || window.parent).postMessage(
    {
      subject: "org.imsglobal.lti.close",
    },
    "*"
  );
};
