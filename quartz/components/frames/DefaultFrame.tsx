import { PageFrame, PageFrameProps } from "./types"
import HeaderConstructor from "../Header"
import MasteryHUDConstructor from "../MasteryHUD"
const Header = HeaderConstructor()
const MasteryHUD = MasteryHUDConstructor()

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
      </>
    )
  },
}
