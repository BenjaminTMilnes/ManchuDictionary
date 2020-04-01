import os
import json
import xml.etree.ElementTree as ET


class Compiler (object):

    def getEntryFilePaths(self):
        filePaths = []

        for a in os.listdir("../data"):
            if a.endswith(".entry.xml"):
                filePaths.append(os.path.join("../data", a))

        return filePaths

    def compileEntry(self, filePath):

        tree = ET.parse(filePath)
        root = tree.getroot()

        entry = {}

        unicode_string = root.find("./unicode").text
        part_of_speech = root.find("./part-of-speech").text
        moellendorff = root.find("./romanisations/moellendorff").text
        west = root.find("./romanisations/west").text
        cmcd = root.find("./romanisations/cmcd").text
        interpretations = root.findall("./interpretations/interpretation")

        entry["Unicode"] = unicode_string
        entry["PartOfSpeech"] = part_of_speech
        entry["Romanisations"] = {}
        entry["Romanisations"]["Moellendorff"] = moellendorff
        entry["Romanisations"]["West"] = west
        entry["Romanisations"]["CMCD"] = cmcd
        
        entry["Interpretations"] = []

        for i in interpretations:
            english = i.find("./english").text
            references = i.findall("./references/reference")

            interpretation = {}
            interpretation["English"] = english
            interpretation["References"] = []

            for r in references:
                title = r.find("./title").text
                author = r.find("./author").text
                publication_date = r.find("./publication-date").text

                reference = {}
                reference["Title"] = title
                reference["Author"] = author
                reference["PublicationDate"] = publication_date
                    
                interpretation["References"].append(reference)

            entry["Interpretations"].append(interpretation)

        return entry

    def compile(self):

        entryFilePaths = self.getEntryFilePaths()
        entries = [self.compileEntry(filePath) for filePath in entryFilePaths]

        data = {}

        data["Entries"] = entries

        print(data)

        with open("../data/compiled.json", "w") as fileObject:
            json.dump(data, fileObject, indent=4)

        with open("../web/dictionary.json", "w") as fileObject:
            json.dump(data, fileObject, indent=4)


if __name__ == "__main__":
    compiler = Compiler()

    compiler.compile()
