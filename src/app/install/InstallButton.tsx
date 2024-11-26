"use client";
import { useState } from "react";
import { installApp } from "../../util/installApp";
import { sendCloseMessage } from "../../util/sendCloseMessage";

type InstallButtonProps = {
  platformConfiguration: any;
  token: string;
};

export default function InstallButton(props: InstallButtonProps) {
  const [installing, setInstalling] = useState(false);

  const [error, setError] = useState();

  return (
    <div className="flex justify-center w-screen mt-44">
      <button
        className="bg-transparent hover:bg-white-500 text-white-700 font-semibold hover:text-white py-2 px-4 border border-white-500 rounded"
        onClick={() => {
          setInstalling(true);
          installApp({
            install_endpoint: props.platformConfiguration.registration_endpoint,
            registration_token: props.token,
          }).then(
            () => {
              sendCloseMessage();
            },
            (err) => {
              setError(err);
            }
          );
        }}
        disabled={installing}
      >
        {installing ? "Installing..." : "Install App"}
      </button>
      {error ? (
        <>
          <div className="text-red-500 text-sm mt-4">Error</div>
          <pre className="text-sm mt-4">{JSON.stringify(error, null, 2)}</pre>
        </>
      ) : null}
    </div>
  );
}
