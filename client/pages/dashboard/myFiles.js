import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Layout from "../../layout/layout";
import styles from "../../styles/MyFile.module.css";
import { animate, motion, useMotionValue, useScroll } from "framer-motion";
import initializeNewUser from "../../utils/polybaseConnection";
import { Polybase } from "@polybase/client";
import { ethPersonalSign } from "@polybase/eth";
import { Auth } from "@polybase/auth";
import {
  usePolybase,
  useDocument,
  useAuth,
  useIsAuthenticated,
  useCollection,
} from "@polybase/react";
import {BsThreeDots, BsTreeeDots} from "react-icons/bs";
const dummyFile = [
  {
    filename: "file1.xyz",
    size: "1mb",
    sender: "Jhon Doe",
  },
  {
    filename: "file1.xyz",
    size: "1mb",
    sender: "Jhon Doe",
  },
  {
    filename: "file1.xyz",
    size: "1mb",
    sender: "Jhon Doe",
  },
  {
    filename: "file1.xyz",
    size: "1mb",
    sender: "Jhon Doe",
  },
  {
    filename: "file1.xyz",
    size: "1mb",
    sender: "Jhon Doe",
  },
  {
    filename: "file1.xyz",
    size: "1mb",
    sender: "Jhon Doe",
  },
  {
    filename: "file1.xyz",
    size: "1mb",
    sender: "Jhon Doe",
  },
  {
    filename: "file1.xyz",
    size: "1mb",
    sender: "Jhon Doe",
  },
  {
    filename: "file1.xyz",
    size: "1mb",
    sender: "Jhon Doe",
  },
  {
    filename: "file1.xyz",
    size: "1mb",
    sender: "Jhon Doe",
  },
  {
    filename: "file1.xyz",
    size: "1mb",
    sender: "Jhon Doe",
  },
];

export default function MyFiles() {
  const ref = useRef(null);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [trackMouse, setTrackMouse] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(true);

  const router = useRouter();

  const x = useMotionValue(0);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    if (!trackMouse) return;

    setAnimationComplete(false);

    const xVal = e.pageX - ref.current.offsetLeft;
    const walk = (xVal - startX) * 2; //scroll-fast

    const controls = animate(x, scrollLeft - walk, {
      type: "tween",
      ease: "easeOut",
      duration: 0,
      onUpdate: (val) => {
        if (!ref.current) return;
        ref.current.scrollLeft = val;
      },
      onComplete: () => {
        setAnimationComplete(true);
      },
      onStop: () => {
        setAnimationComplete(true);
      },
    });
    return controls.stop;
  };

  const handleMouseDown = (e) => {
    // if (!(e.target instanceof HTMLLIElement)) return;
    if (!ref.current) return;

    setTrackMouse(true);

    const startX = e.pageX - ref.current.offsetLeft;
    setStartX(startX);

    const scrollLeft = ref.current.scrollLeft;
    setScrollLeft(scrollLeft);
  };

  const handleMouseLeave = () => {
    setTrackMouse(false);
  };

  const handleMouseUp = () => {
    setTrackMouse(false);
  };

  const handleScroll = () => {
    if (!ref.current) return;

    if (animationComplete) {
      x.set(ref.current.scrollLeft);
    }
  };

  const openPdfFileHandler = (cid, filename) => {
    router.push(`/view-pdf/${cid}?filename=${filename}`);
  };

  const openMediaFileHandler = (cid, filename) => {
    router.push(`/view-media/${cid}?filename=${filename}`);
  };

  const viewFileHandler = (cid, filename) => {
    const formattedCid = cid.split("/")[0];
    console.log("CID", formattedCid);

    const formattedFilename = encodeURIComponent(filename);
    console.log("Filename", formattedFilename);

    const filetype = formattedFilename.split(".")[1].toLocaleLowerCase();

    if (filetype === "pdf") {
      return openPdfFileHandler(formattedCid, formattedFilename);
    }

    const mediaFileTypes = ["mp4", "jpeg", "jpg", "png", "gif", "webp", "svg"];
    if (mediaFileTypes.includes(filetype)) {
      return openMediaFileHandler(formattedCid, formattedFilename);
    }
  }


  // Code for polybase connection starts below

  const polybase = usePolybase();

  const { auth, state, loading } = useAuth();

  const { data, error, dataLoading } = useCollection(
    polybase
      .collection("Safes")
      .where("account", "==", "0x6e7f1a7d1bac9c7784c7c7cdb098a727f62e95c7")
    // .where("account", "==", `0x6e7F1a7d1Bac9c7784c7C7Cdb098A727F62E95c7`)
  );

  useEffect(() => {
    (async () => {
      //   polybaseTest();
      console.log(data);
    })();
  }, [data]);

  async function polybaseTest() {
    console.log("Polybase test");
    await auth.signIn();
  }

  async function UploadFile() {
    console.log(data.data);

    const res = await polybase
      .collection("Safes")
      .create([
        `${data.data.length}`,
        `0x6e7F1a7d1Bac9c7784c7C7Cdb098A727F62E95c7`,
        `filename.txt`,
        `bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi`,
      ]);

    console.log(res);
  }

  // End of polybase integration code

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.greetHolder}>
          <div>
            <button onClick={() => polybaseTest()}>Sign In</button>
            <button onClick={() => auth.signOut()}>Sign Out</button>
            <button onClick={() => UploadFile()}>Test btn</button>
          </div>
          <h1 className={styles.welcome}>Welcome!</h1>
          <h3 className={styles.username}>@username</h3>
        </div>
        <div className={styles.myFilesContainer}>
          <div className={styles.myFilesTitleHolder}>
            <h1 className={styles.myFilesTitle}>My Files</h1>
          </div>
          <motion.div
            className={styles.myFileHolderParent}
            whileTap={{ cursor: "grabbing" }}
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onScroll={handleScroll}
          >
            {dummyFile != null
              ? dummyFile.map((item, index) => (
                <motion.div
                  key={index}
                  className={styles.filebox}
                  style={{ userSelect: trackMouse ? "none" : "auto" }}
                  onClick={
                    // open modal here
                    // for view file call -> 
                    () => {
                      viewFileHandler(item.data.cid, item.data.name)
                    }
                  }
                >
                  <div className={styles.fileTextHolder}>
                    <h1 className={item.filename}>{item.filename}</h1>
                    <h3 className={item.filesize}><BsThreeDots/></h3>
                  </div>
                </motion.div>
              ))
              : ""}
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
