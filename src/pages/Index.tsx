import { CustomTabs, CustomTabsList, TabsTrigger, TabsContent } from "@/components/CustomTabs"

const Index = () => {
  return (
    <div className="container mx-auto p-4">
      <CustomTabs defaultValue="tab1">
        <CustomTabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </CustomTabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
        <TabsContent value="tab2">Content 2</TabsContent>
      </CustomTabs>
    </div>
  );
};

export default Index;