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

    def getReferenceFilePaths(self):
        filePaths = []

        for a in os.listdir("../data"):
            if a.endswith(".reference.xml"):
                filePaths.append(os.path.join("../data", a))

        return filePaths

    def compileEntry(self, filePath):

        tree = ET.parse(filePath)
        root = tree.getroot()
        fileName = filePath[filePath.rfind("\\") + 1:]

        entry = {}

        urlReference = fileName[:fileName.find(".")]
        unicode_string = root.find("./unicode").text
        part_of_speech = root.find("./part-of-speech").text
        romanisations = root.findall("./romanisations/romanisation")
        interpretations = root.findall("./interpretations/interpretation")
        inflexions = root.findall("./inflexions/inflexion")
        examples = root.findall("./examples/example")

        entry["URLReference"] = urlReference 
        entry["Unicode"] = unicode_string
        entry["PartOfSpeech"] = part_of_speech
        entry["Romanisations"] = {}       
        entry["Interpretations"] = []
        entry["Inflexions"] = {}
        entry["Examples"] = []

        for r in romanisations:
            system = r.attrib["system"]
            text = r.text 

            if system == "moellendorff":
                entry["Romanisations"]["Moellendorff"] = text 

            if system == "west":
                entry["Romanisations"]["West"] = text 

            if system == "cmcd":
                entry["Romanisations"]["CMCD"] = text 

        for i in interpretations:
            language = i.attrib["language"]
            text = i.find("./text").text
            references = [r.strip() for r in i.attrib["references"].split(",")]

            interpretation = {}
            interpretation["Language"] = language 
            interpretation["Text"] = text
            interpretation["References"] = references 
            
            entry["Interpretations"].append(interpretation)

        for i in inflexions:
            _type = i.attrib["type"]
            romanisations = i.findall("./romanisations/romanisation")

            inflexion = {}
            inflexion["Unicode"] = ""
            inflexion["Romanisations"] = {}

            for r in romanisations:
                system = r.attrib["system"]
                text = r.text 

                if system == "moellendorff":
                    inflexion["Romanisations"]["Moellendorff"] = text 

                if system == "west":
                    inflexion["Romanisations"]["West"] = text 

                if system == "cmcd":
                    inflexion["Romanisations"]["CMCD"] = text 

            entry["Inflexions"][_type] = inflexion

        for e in examples:
            romanisations = e.findall("./romanisations/romanisation")
            interpretations = e.findall("./interpretations/interpretation")

            example = {}
            example["Unicode"] = ""
            example["Romanisations"] = {}
            example["Interpretations"] = []

            for r in romanisations:
                system = r.attrib["system"]
                text = r.text 

                if system == "moellendorff":
                    example["Romanisations"]["Moellendorff"] = text 

                if system == "west":
                    example["Romanisations"]["West"] = text 

                if system == "cmcd":
                    example["Romanisations"]["CMCD"] = text 

            for i in interpretations:
                language = i.attrib["language"]
                text = i.find("./text").text
                references = [r.strip() for r in i.attrib["references"].split(",")]

                interpretation = {}
                interpretation["Language"] = language 
                interpretation["Text"] = text
                interpretation["References"] = references 
                
                example["Interpretations"].append(interpretation)

            entry["Examples"].append(example)

        return entry            

    def compileReference(self, filePath):

        tree = ET.parse(filePath)
        root = tree.getroot()

        reference = {}

        reference["Reference"] = root.attrib["reference"]
        reference["Type"] = root.attrib["type"]
        reference["Title"] =  root.find("./title").text
        reference["Author"] =  root.find("./author").text
        reference["PublicationDate"] =  root.find("./publication-date").text

        return reference 
            
    def compile(self):

        entryFilePaths = self.getEntryFilePaths()
        entries = [self.compileEntry(filePath) for filePath in entryFilePaths]

        referenceFilePaths = self.getReferenceFilePaths()
        references = [self.compileReference(filePath) for filePath in referenceFilePaths]
        references = {r["Reference"]: r for r in references}

        data = {}

        data["References"] = references 
        data["Entries"] = entries

        print(data)

        with open("../data/compiled.json", "w") as fileObject:
            json.dump(data, fileObject, indent=4)

        with open("../web/dictionary.json", "w") as fileObject:
            json.dump(data, fileObject, indent=4)


if __name__ == "__main__":
    compiler = Compiler()

    compiler.compile()
