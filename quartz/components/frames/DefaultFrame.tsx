import { PageFrame, PageFrameProps } from "./types"
import HeaderConstructor from "../Header"
import MobileFloatBarConstructor from "../MobileFloatBar"
import MasteryHUDConstructor from "../MasteryHUD"
import CodeEnhancerConstructor from "../CodeEnhancer"
import MobileTOCConstructor from "../MobileTOC"
import FeatureMenuConstructor from "../FeatureMenu"
import ObsidianGraphDockConstructor from "../ObsidianGraphDock"
const Header = HeaderConstructor()
const MobileFloatBar = MobileFloatBarConstructor()
const MasteryHUD = MasteryHUDConstructor()
const CodeEnhancer = CodeEnhancerConstructor()
const MobileTOC = MobileTOCConstructor()
const FeatureMenu = FeatureMenuConstructor()
const ObsidianGraphDock = ObsidianGraphDockConstructor()

/**
 * Enhanced Quartz 5 Page Frame
 * Renders Top Web Navbar full-width above the 3-column layout.
 */
export const DefaultFrame: PageFrame = {
  name: "default",
  render({
    componentData,
    header,
    beforeBody,
    pageBody: Content,
    afterBody,
    left,
    right,
    footer,
  }: PageFrameProps) {
    return (
      <>
        {/* 3-Column Body Grid */}
        <div class="left sidebar">
          {left.map((BodyComponent) => (
            <BodyComponent {...componentData} />
          ))}
        </div>
        <div class="center">
          <div class="page-header">
            {header.map((HeaderComponent) => (
              <HeaderComponent {...componentData} />
            ))}
            <div class="popover-hint">
              <MasteryHUD {...componentData} />
              {beforeBody.map((BodyComponent) => (
                <BodyComponent {...componentData} />
              ))}
            </div>
          </div>
          <Content {...componentData} />
          <hr />
          <div class="page-footer">
            {afterBody.map((BodyComponent) => (
              <BodyComponent {...componentData} />
            ))}
          </div>
        </div>
        <div class="right sidebar">
          {right.map((BodyComponent) => (
            <BodyComponent {...componentData} />
          ))}
        </div>
        {footer.map((FooterComponent) => (
          <FooterComponent {...componentData} />
        ))}
        <FeatureMenu {...componentData} />
        <MobileFloatBar {...componentData} />
        <ObsidianGraphDock {...componentData} />
        <MobileTOC {...componentData} />
        <CodeEnhancer {...componentData} />
      </>
    )
  },
}
