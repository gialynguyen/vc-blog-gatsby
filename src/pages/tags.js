import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import styled from 'styled-components'
import { graphql, Link, navigate } from 'gatsby'
import { rhythm } from "../utils/typography"

const BlogItem = styled.article`
  margin-bottom: 1.25rem;
`

const TagIndex = ({ location, pageContext, data }) => {
  const tagName = pageContext?.tag?.fieldValue;
  const { edges } = data.allMarkdownRemark

  if (!tagName) {
    navigate('/', {
      replace: true,
    })
    return null;
  }

  return (
    <Layout location={location} title={`Tags: ${tagName}`}>
      <SEO title={`Tags: ${tagName}`} />
      {
        edges?.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug;
          return (
            <BlogItem key={node.fields.slug}>
              <header>
                <h3
                  style={{
                    marginBottom: rhythm(1 / 4),
                  }}
                >
                  <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                    {title}
                  </Link>
                </h3>
                <small>{node.frontmatter.date}</small>
              </header>
              <section>
                <p
                  dangerouslySetInnerHTML={{
                    __html: node.frontmatter.description || node.excerpt,
                  }}
                />
              </section>
            </BlogItem>
          )
        })
      }
    </Layout>
  )
}

export const pageQuery = graphql`
  query($tagName: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { eq: $tagName } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            description
          }
        }
      }
    }
  }
`

export default TagIndex;