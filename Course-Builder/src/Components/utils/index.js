import { BsFileEarmarkPdf } from "react-icons/bs";
import { CiImageOn } from "react-icons/ci";

export const getIconForFileType = (fileName) => {
    if (fileName.endsWith(".pdf")) {
        return <BsFileEarmarkPdf className="mr-2 text-red-500" />;
    }
    if (fileName.endsWith(".jpg") || fileName.endsWith(".jpeg") || fileName.endsWith(".png")) {
        return <CiImageOn className="mr-2 text-blue-500" />;
    }
    return null;
};