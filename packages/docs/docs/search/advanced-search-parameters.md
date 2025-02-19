---
sidebar_position: 2
---

import MedplumCodeBlock from '@site/src/components/MedplumCodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import ExampleCode from '!!raw-loader!@site/..//examples/src/search/advanced-search-parameters.ts';

# Advanced Search Parameters

The FHIR search framework allows for special search parameters that enable more complex searches to fine-tune your results. In this document, we will go over the following special parameters:

- [\_id](#_id)
- [\_lastUpdated](#_lastupdated)
- [\_summary](#_summary)
- [\_elements](#_elements)
- [\_tag](#_tag)
- [\_compartment](#_compartment)
- [\_total](#_total)
- [\_profile](#_profile)
- [\_filter](#_filter)
- [\_sort](#_sort)

## \_id

The `_id` parameter allows you to search for any resource based on its `id` element. It is also the only way to search using multiple ids in FHIR. To do so, just enter the ids as a comma separated list.

<details><summary>Example: Searching for patients by _id</summary>
  <Tabs groupId="language">
    <TabItem value="ts" label="Typescript">
      <MedplumCodeBlock language="ts" selectBlocks="idTs">
        {ExampleCode}
      </MedplumCodeBlock>
    </TabItem>
    <TabItem value="cli" label="CLI">
      <MedplumCodeBlock language="bash" selectBlocks="idCli">
        {ExampleCode}
      </MedplumCodeBlock>
    </TabItem>
    <TabItem value="curl" label="cURL">
      <MedplumCodeBlock language="bash" selectBlocks="idCurl">
        {ExampleCode}
      </MedplumCodeBlock>
    </TabItem>
  </Tabs>
</details>

## \_lastUpdated

The `_lastUpdated` parameter allows you to search for resources based on when they were most recently changed.

This is especially useful when combined with [comparision operators](/docs/search/basic-search#searching-by-comparison), such as `gt` (greater than) or `lt` (less than) to find resources that have or have not been changed since a certain time or date.

<details><summary>Example: Searching for only communications that have occurred since the beginning of October, 2023</summary>
  <Tabs groupId="language">
    <TabItem value="ts" label="Typescript">
      <MedplumCodeBlock language="ts" selectBlocks="lastUpdatedTs">
        {ExampleCode}
      </MedplumCodeBlock>
    </TabItem>
    <TabItem value="cli" label="CLI">
      <MedplumCodeBlock language="bash" selectBlocks="lastUpdatedCli">
        {ExampleCode}
      </MedplumCodeBlock>
    </TabItem>
    <TabItem value="curl" label="cURL">
      <MedplumCodeBlock language="bash" selectBlocks="lastUpdatedCurl">
        {ExampleCode}
      </MedplumCodeBlock>
    </TabItem>
  </Tabs>
</details>

## \_summary

The `_summary` parameter allows you to return only a portion of a resource's elements. Its primary intent is to optimize your queries by fetching only essential information. It is particularly useful when searching for large resources such as those with images or repeating elements.

The `_summary` parameter can contain one of the following value set:

| Value   | Description                                                                                         |
| ------- | --------------------------------------------------------------------------------------------------- |
| `true`  | Only returns elements that are marked as `summary` in the resource definition.                      |
| `count` | Returns the count of matching resources, but none of the actual resource details for those matches. |

<details><summary>Example: Searching for a summary of a patient</summary>
  <Tabs groupId="language">
    <TabItem value="ts" label="Typescript">
      <MedplumCodeBlock language="ts" selectBlocks="summaryTs">
        {ExampleCode}
      </MedplumCodeBlock>
    </TabItem>
    <TabItem value="cli" label="CLI">
      <MedplumCodeBlock language="bash" selectBlocks="summaryCli">
        {ExampleCode}
      </MedplumCodeBlock>
    </TabItem>
    <TabItem value="curl" label="cURL">
      <MedplumCodeBlock language="bash" selectBlocks="summaryCurl">
        {ExampleCode}
      </MedplumCodeBlock>
    </TabItem>
  </Tabs>
</details>

## \_elements

The `_elements` parameter is similar to `_summary` in that it allows you to return only a subset of the resource's elements. However, rather than a predefined value set, `_elements` allows you to choose which fields you would like to return.

The fields you choose should be formatted as a comma separated list of base elements for a given resource.

Note that any top-level mandatory or modifier elements should always be included in the chosen list of elements.

<details><summary>Example: Searching the subject and performers of observations</summary>
  <Tabs groupId="language">
    <TabItem value="ts" label="Typescript">
      <MedplumCodeBlock language="ts" selectBlocks="elementsTs">
        {ExampleCode}
      </MedplumCodeBlock>
    </TabItem>
    <TabItem value="cli" label="CLI">
      <MedplumCodeBlock language="bash" selectBlocks="elementsCli">
        {ExampleCode}
      </MedplumCodeBlock>
    </TabItem>
    <TabItem value="curl" label="cURL">
      <MedplumCodeBlock language="bash" selectBlocks="elementsCurl">
        {ExampleCode}
      </MedplumCodeBlock>
    </TabItem>
  </Tabs>
</details>

## \_tag

The `_tag` parameter allows you to search on the `tag` field of the `meta` element of the resource you are searching for. The `tag` field contains user-defined tags to categorize the resource.

<details><summary>Example: Searching for observations that are tagged as critical</summary>
  <Tabs groupId="language">
    <TabItem value="ts" label="Typescript">
      <MedplumCodeBlock language="ts" selectBlocks="tagTs">
        {ExampleCode}
      </MedplumCodeBlock>
    </TabItem>
    <TabItem value="cli" label="CLI">
      <MedplumCodeBlock language="bash" selectBlocks="tagCli">
        {ExampleCode}
      </MedplumCodeBlock>
    </TabItem>
    <TabItem value="curl" label="cURL">
      <MedplumCodeBlock language="bash" selectBlocks="tagCurl">
        {ExampleCode}
      </MedplumCodeBlock>
    </TabItem>
  </Tabs>
</details>

## \_compartment

A compartment is a grouping of resources which share a common relation. For example, each `Patient` resource has its own compartment. A `Patient` compartment includes any resources which reference that `Patient`, usually in the `subject` field.

Medplum allows you to easily search using compartments by providing the non-standard `_compartment` parameter. This enables you to find all resources of a given type that are associated with a certain compartment.

<details><summary>Example: Find all communications for a patient</summary>
  <Tabs groupId="language">
    <TabItem value="ts" label="Typescript">
      <MedplumCodeBlock language="ts" selectBlocks="compartmentTs">
        {ExampleCode}
      </MedplumCodeBlock>
    </TabItem>
    <TabItem value="cli" label="CLI">
      <MedplumCodeBlock language="bash" selectBlocks="compartmentCli">
        {ExampleCode}
      </MedplumCodeBlock>
    </TabItem>
    <TabItem value="curl" label="cURL">
      <MedplumCodeBlock language="bash" selectBlocks="compartmentCurl">
        {ExampleCode}
      </MedplumCodeBlock>
    </TabItem>
  </Tabs>
</details>

## \_total

The `_total` parameter allows you to return the total count of matching resources in your search response. For more details see the [Paginated Search docs.](/docs/search/paginated-search#getting-the-total-number-of-results-with-total)

<details><summary>Example: Search for all patients in your organization and get an estimate of the total number</summary>
  <Tabs groupId="language">
    <TabItem value="ts" label="Typescript">
      <MedplumCodeBlock language="ts" selectBlocks="totalTs">
        {ExampleCode}
      </MedplumCodeBlock>
    </TabItem>
    <TabItem value="cli" label="CLI">
      <MedplumCodeBlock language="bash" selectBlocks="totalCli">
        {ExampleCode}
      </MedplumCodeBlock>
    </TabItem>
    <TabItem value="curl" label="cURL">
      <MedplumCodeBlock language="bash" selectBlocks="totalCurl">
        {ExampleCode}
      </MedplumCodeBlock>
    </TabItem>
  </Tabs>
</details>

## \_profile

FHIR allows [profiling](http://hl7.org/fhir/R4/profiling.html) to create custom data structures that specify how resources can be sub-specialized to meet specific use cases. The `_profile` parameter allows you to search based on these profiles.

The `_profile` parameter is a reference parameter, meaning you may provide a reference as an argument to the parameter. See the [FHIR Profiles doc](https://www.medplum.com/docs/fhir-datastore/profiles) to learn more about profiling.

<details><summary>Example: Search for observations that are part of the pediatric growth charts profile</summary>
  <Tabs groupId="language">
    <TabItem value="ts" label="Typescript">
      <MedplumCodeBlock language="ts" selectBlocks="profileTs">
        {ExampleCode}
      </MedplumCodeBlock>
    </TabItem>
    <TabItem value="cli" label="CLI">
      <MedplumCodeBlock language="bash" selectBlocks="profileCli">
        {ExampleCode}
      </MedplumCodeBlock>
    </TabItem>
    <TabItem value="curl" label="cURL">
      <MedplumCodeBlock language="bash" selectBlocks="profileCurl">
        {ExampleCode}
      </MedplumCodeBlock>
    </TabItem>
  </Tabs>
</details>

## \_filter

The `_filter` parameter can be used to filter for more complex queries. For more details see the [\_filter Search Parameter docs](/docs/search/filter-search-parameter).

## \_sort

The `_sort` parameter allows you to sort the results of your search based on different parameters. For details on how to use the `_sort` parameter, see the [Sorting the Results docs](/docs/search/basic-search#sorting-the-results).
