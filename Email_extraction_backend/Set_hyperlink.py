from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.shared import Pt

import docx

# method to add an hyperlink within a paragraph object

def add_hyperlink(paragraph, url, text, color="0000FF", underline=True):
    
    part = paragraph.part #create the w:hyperlink tag and add needed values
    r_id = part.relate_to(url, docx.opc.constants.RELATIONSHIP_TYPE.HYPERLINK, is_external=True)
    hyperlink = OxmlElement('w:hyperlink')
    hyperlink.set(qn('r:id'), r_id)
    
    # create a w:r element and a new w:rPr element
    new_run = OxmlElement('w:r')
    rPr = OxmlElement('w:rPr')
    
    if color is not None: #add color if not given
        c = OxmlElement('w:color')
        c.set(qn('w:val'), color)
        rPr.append(c)
        
    if not underline: # remove underline if it is requested
        u = OxmlElement('w:u')
        u.set(qn('w:val'), 'none')
        rPr.append(u)
        
    new_run.append(rPr)
    new_run.text = text
    hyperlink.append(new_run)
    
    paragraph._p.append(hyperlink) # append hyperlink to paragraph