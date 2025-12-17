import {
  RecoilRoot,
  // useRecoilState -> [count, setCount]
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import {
  jobAtom,
  messageAtom,
  networkAtom,
  notificationAtom,
  profileSelector,
} from "./atoms";
import { useMemo } from "react";

function App() {
  return (
    <RecoilRoot>
      <Wrapper />
    </RecoilRoot>
  );
}

function Wrapper() {
  const buttonStyle = {
    fontSize: 16,
    padding: 10,
    borderRadius: 10,
    cursor: "pointer",
  };

  const divStyle = {
    display: "flex",
    justifyContent: "center",
    gap: 10,
    backgroundColor: "#dfdfdf",
    padding: 20,
    borderRadius: 20,
  };

  const networkCount = useRecoilValue(networkAtom);
  const jobCount = useRecoilValue(jobAtom);
  const notificationCount = useRecoilValue(notificationAtom);
  const messageCount = useRecoilValue(messageAtom);

  const totalCount = useMemo(
    () => networkCount + jobCount + notificationCount + messageCount,
    [networkCount, jobCount, notificationCount, messageCount]
  );

  return (
    <div style={divStyle}>
      <button style={buttonStyle}>Home</button>
      <button style={buttonStyle}>
        My Network ({networkCount > 100 ? "99+" : networkCount})
      </button>
      <button style={buttonStyle}>
        Jobs ({jobCount > 100 ? "99+" : jobCount})
      </button>
      <button style={buttonStyle}>
        Notifications ({notificationCount > 100 ? "99+" : notificationCount})
      </button>
      <button style={buttonStyle}>
        Messaging ({messageCount > 100 ? "99+" : messageCount})
      </button>
      <Updater buttonStyle={buttonStyle} total={totalCount} />
    </div>
  );
}

function Updater({ buttonStyle, total }) {
  const setMessageCount = useSetRecoilState(messageAtom);
  const totalCount = useRecoilValue(profileSelector);
  return (
    <button onClick={() => setMessageCount((c) => c + 1)} style={buttonStyle}>
      Me ({total})
    </button>
  );
}

export default App;
