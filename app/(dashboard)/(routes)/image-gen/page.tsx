"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { ImageIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";

import Empty from "@/components/Empty";
import Heading from "@/components/Heading";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

import { useState } from "react";
import { formSchema } from "./constants";

const ImageGenPage = () => {
  // hooks
  const router = useRouter();
  // states
  const [images, setImages] = useState<string[]>([]);
  // set up form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { prompt: "", amount: "1", resolution: "512x512" },
  });
  // form loading state
  const formLoading = form.formState.isSubmitting;
  // handle submit form
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // reset images array
      setImages([]);
      // call image gen api
      const response = await axios.post("/api/image-gen", values);
      // extract the image urls
      const urls = response.data.map((image: { url: string }) => image.url);
      // update images array
      setImages(urls);
      // reset form for new promt
      form.reset();
    } catch (error) {
      // TODO: open modal
      console.log("[IMAGEGEN_SUBMIT_ERROR]", error);
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      <Heading
        {...{
          title: "Image Generation",
          desc: "Turn your prompt into an desired image",
          icon: ImageIcon,
          iconColor: "text-pink-500",
          bgColor: "bg-pink-500/10",
        }}
      />
      <div className="px-4 lg:px-8">
        <div className="mb-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-8">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={formLoading}
                        placeholder="A panda producing EDM music"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button className="col-span-6 lg:col-span-2 w-full">
                Generate
              </Button>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  setImages([]);
                }}
                variant="destructive"
                className="col-span-6 lg:col-span-2 w-full"
                disabled={images.length <= 0}
              >
                Clear All
              </Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 mt-4 pb-4">
          {formLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
              <Loader />
            </div>
          )}
          {images.length === 0 && !formLoading && (
            <Empty label="Let's make some images  ✨" />
          )}
          {images.length > 0 && <Separator />}
          {images.length > 0 && <div>Images will be here</div>}
        </div>
      </div>
    </div>
  );
};

export default ImageGenPage;