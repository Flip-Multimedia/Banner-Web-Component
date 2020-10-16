/*
 * (C) Copyright 2020 Flip Multimedia (https://flipweb.co.uk) and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Contributors:
 *  @author James Gibbons <jgibbons@flipweb.co.uk>
 * 
 * 
 */

module.exports.CoreComponent = class BannerComponent {
  
  /**
   *
   *
   * @static
   * @return {*} 
   */
  static getCategory() {
    return 'Miscellaneous';
  }

  /**
   *
   *
   * @static
   * @return {*} 
   */
  static getDescription() {
    return 'Static banner component.';
  }
  
  /**
   *
   *
   * @static
   * @return {*} 
   */
  static getDefault() {
    return {
      title: 'Welcome your customers!',
      content: 'Banners are a great way to get your customers attention, and display critical information.',

      styles: {
        base: {
          width: '100%',
          height: "500px",
        },
  
        overlay: {
          width: "100%",
          height: "100%",
          
          color: "white",

          padding: "100px",
          "background-color": "rgba(0,0,0,0.5)"
        },

        title: {
          "margin-top": "50px"
        }
      }
    }
  }

  /**
   *
   *
   * @static
   * @param {*} component
   * @return {*} 
   */
  static render(component) {
    const getStyles = require(__dirname + '/../../utils.js').componentTypes.getStyles;

    return `
      <div data-type='component' data-drag='no-drag' data-component-type="${component.type}" class='component-dynamic' style="${getStyles(component, 'wrap')}">
        <div style='${getStyles(component, "base")}' class='banner base'>
          <div style='${getStyles(component, "overlay")}' class='overlay'>
            <div style='${getStyles(component, "content")}' class='content'>
              <div class='container'>
                <h2 data-attribute='title' style='${getStyles(component, 'title')}'>
                  ${component.title}
                </h2>
                <p data-attribute='content' style='${getStyles(component, 'body')}'>
                  ${component.content}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Creates an instance of BannerComponent.
   * @param {*} component
   */
  constructor(component) {
    this.type = 'bannerComponent';

    this.hasOverlay = false;
    this.backgroundType = 'colour';

    this.title = '';
    this.content = '';
    this.buttons = [];

    this.layout = {};
    this.styles = {
      base: {
        width: '100%',
        "min-height": "650px",
        padding: "100px"
      },

      overlay: {
        width: "100%",
        height: "100%",
        
        "background-color": "rgba(0,0,0,0.5)"
      }
    }

    if(component.title) {
      this.title = component.title;
    }

    if(component.content) {
      this.content = component.content;
    }

    if(component.styles) {
      this.styles = component.styles;
    }

    if(component.buttons) {
      this.buttons = component.buttons;
    }

    if(component.backgroundType) {
      this.backgroundType = component.backgroundType;
    }

    this.editorUi = this.defineEditorUI();
  }

  /**
   *
   *
   * @return {*} 
   */
  defineEditorUI() {
    const TYPES = require('../../utils.js').componentTypes;
    const ui = new TYPES.EditorUI();

    ui.addSection(new TYPES.EditorUISection('Banner Content', [
      new TYPES.EditorUIAttribute({
        label: 'Update Title',
        uiInputType: 'text',

        targetAttribute: 'title'
      }), 

      new TYPES.EditorUIAttribute({
        label: 'Update Content',
        uiInputType: 'textarea',

        targetAttribute: 'content'
      })
    ]));

    ui.addSection(new TYPES.EditorUISection('Banner Dimensions', [
      new TYPES.EditorUIAttribute({
        label: 'Select alignment',
        uiInputType: 'numberPx',

        isStylesAttribute: true,
        targetStyleElement: 'base',
        targetAttribute: 'height'
      })
    ]));

    ui.addSection(new TYPES.EditorUISection('Content Alignment', [
      new TYPES.EditorUIAttribute({
        label: 'Select alignment',
        uiInputType: 'selector',
        uiInputSelectOptions: {
          'Align Left': 'left',
          'Align Right': 'right',
          'Align Center': 'center'
        },

        isStylesAttribute: true,
        targetStyleElement: 'overlay',
        targetAttribute: 'text-align'
      })
    ]));

    // ui.addSection(new TYPES.EditorUISection('Banner Background', [
    //   new TYPES.EditorUIAttribute({
    //     label: 'Change background type',
    //     uiInputType: 'selector',
    //     uiInputSelectOptions: {
    //       'Background Colour': 'colour',
    //       'Background Image': 'image'
    //     },

    //     targetAttribute: 'backgroundType'
    //   }),

    //   new TYPES.EditorUIAttribute({
    //     label: 'Select Background Colour',
    //     uiInputType: 'colour',

    //     // only display backgroundType colour is selected.
    //     requires: [{
    //       attribute: 'backgroundType',
    //       equalTo: 'colour'
    //     }],

    //     isStylesAttribute: true,
    //     targetStyleElement: 'base',
    //     targetAttribute: 'background-color'
    //   })
    // ], {

    //   dropdown: true
    // }));

    return ui;
  }

}