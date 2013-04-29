---
layout: post
title: Creating a Column Control in Adobe CQ
original: http://www.sixdimensions.com/creating-a-column-control-in-adobe-cq/
---

Column Controls in Adobe CQ allow authors to easily create and configure column-based layouts. &nbsp;This guide shows advanced users and developers how to create and configure a column control.

### Step 1: Add a Parsys to a Component JSP

Include a Paragraph System into the page's component JSP.&nbsp; You can use any node name for the path, the resource type is 'foundation/components/parsys'

`&lt;cq:includepath="par"resourceType="foundation/components/parsys "/&gt;`

### Step 2: Configure the Paragraph System

To add a Column Control to the Paragraph System, you will first need to update the design.&nbsp; Select design mode on the sidekick.

![Selecting Design Mode][1]  
*Selecting Design Mode*

Design mode allows you to configure the Paragraph System for all pages with the same template.&nbsp; Once the page has reloaded, select Edit next to 'Design of {NODE}'

![Selecting Column Control Component][2]  
*Selecting Column Control Component*

Look down through the list of available components and expand Columns.&nbsp; Select Column Control and then press OK to save your design changes.

### Step 3: Add and Configure the Column Control

Switch back to edit mode by expanding the sidekick.&nbsp; In your new Paragraph System and select New' then select Column Control from the available components.

![Insert a Column Control][3]  
*Inserting a Column Control*

Once the page reloads, you should see your new Column Control on the page.&nbsp; Select the edit design button on the sidekick to configure the column.&nbsp; Now you should see two entries in design mode.&nbsp; Select edit next to 'Design of colctrl' to edit the design of the column control.

The design for the Column Control has only one field.&nbsp; The Allowed Formats controls what options will be available for authors for using the column control.&nbsp; Each format is separated by a new line and the various fields are separated by characters.&nbsp;&nbsp; The fields for the allowed format are:

*   **Number of Columns** ' Used to determine the number of columns in which CQ will allow you to add components.
*   **Column Class** ' Used to set the class for the Column Control HTML.&nbsp; This should be a class in your CSS stylesheet.
*   **Format Label ' **Displayed to the user when the select which column&nbsp; format to put on the page.

The format for each fields are as follows:

\[Number of Columns\]&nbsp; %2B ';' %2B \[Column Class\] %2B 't' %2B \[Format Label\]

![Editing the Column Control Design][4]  
*Editing the Column Control Design*

Enter the formats you want to have for your Column Control, remembering that each CSS class should be unique.&nbsp; Select OK to save your changed and expand the sidekick to switch back to edit mode.

### Step 4: Editing the Column Control

One you have configured the column control, you can edit it.&nbsp; First, select Edit next to 'Start of 1 Columns'.&nbsp; This will bring up a dialog for you to select the Column Layout to use.&nbsp; Once you click OK, the appropriate number of drag and drop fields will appear in the Column Control.

![Adding Components into the Column Control][5]  
*Adding Components into the Column Control*

Right click inside each column's drag and drop field and select 'New''&nbsp; to add components into the column.

### Step 5: Update Stylesheet

Finally, to make the column display correctly, you will need to update your CSS stylesheet.&nbsp; The column control will have the classes 'parsys\_column' and the Column Class you specified in Step 3.&nbsp; Each column will have the classes 'parsys\_column' and the Column Class you specified in Step 3 with '-c\[Column Number\]' appended.&nbsp; The column number is a zero based index.

For example if my Column Class was 'cq-colctrl-lt0'&nbsp; the second column would be 'cq-colctrl-lt0-c1'.

For more information about using CSS to style columns read the following guides:

* [http://matthewjamestaylor.com/blog/equal-height-columns-cross-browser-css-no-hacks][6]
* [http://www.search-this.com/2007/02/26/how-to-make-equal-columns-in-css/][7]

 [1]: /images/posts/2012-02-07-creating-a-column-control-in-adobe-cq/selecting-design.png
 [2]: /images/posts/2012-02-07-creating-a-column-control-in-adobe-cq/selecting-column-control.png
 [3]: /images/posts/2012-02-07-creating-a-column-control-in-adobe-cq/insert-column-control.png
 [4]: /images/posts/2012-02-07-creating-a-column-control-in-adobe-cq/edting-column-control.png
 [5]: /images/posts/2012-02-07-creating-a-column-control-in-adobe-cq/adding-components-e1328584901873.png
 [6]: http://matthewjamestaylor.com/blog/equal-height-columns-cross-browser-css-no-hacks
 [7]: http://www.search-this.com/2007/02/26/how-to-make-equal-columns-in-css/