import { describe, it, expect} from "bun:test";
import { parseURL } from "./get_data";

describe('parseURL', () => {
    it('should return the video ID from a YouTube URL', () => {
        const videoID : String = "dQw4w9WgXcQ";
        const parsedData = parseURL("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
        expect(parsedData).toBe(videoID);
    })

    it('should return -1 for an incorrect URL', () => {
        const incorrectUrl = "https://www.google.com/search?q=Never+gonna+give+you+up&sca_esv=565286027&source=hp&ei=08MCZaSxBLqB2roPoL2EsAc&iflsig=AO6bgOgAAAAAZQLR46lKvYaXSUCEhrD0-duX6n9QJNIq&ved=0ahUKEwjk5q2E16mBAxW6gFYBHaAeAXYQ4dUDCAk&uact=5&oq=Never+gonna+give+you+up&gs_lp=Egdnd3Mtd2l6IhdOZXZlciBnb25uYSBnaXZlIHlvdSB1cDIFEC4YgAQyBRAAGIAEMgUQABiABDIFEAAYgAQyBRAAGIAEMgUQABiABDIFEAAYgAQyBRAAGIAEMgUQABiABDIFEAAYgARI6RlQAFjtGHADeACQAQCYAXmgAekUqgEFMTIuMTS4AQPIAQD4AQHCAgsQABiABBixAxiDAcICDhAuGIMBGNQCGLEDGIoFwgIREC4YgAQYsQMYgwEYxwEY0QPCAgsQLhiABBixAxiDAcICCxAAGIoFGLEDGIMBwgIIEAAYgAQYsQPCAggQLhiABBixA8ICCBAuGLEDGIAEwgIHEC4YgAQYCsICBxAAGIAEGAo&sclient=gws-wiz"
        const parsedData = parseURL(incorrectUrl);
        expect(parsedData).toBe(-1);
    })

    it('should return -1 for an empty string input (misclick)', () => {
        const misclickedInput = "";
        const parsedData = parseURL(misclickedInput);
        expect(parsedData).toBe(-1);
    })
})
