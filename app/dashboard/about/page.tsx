import AboutForm from "@/app/components/dashboard/ui/about-form";
import BasicInfo from "@/app/components/dashboard/ui/about/basic-info";
import SectionCard from "@/app/components/dashboard/ui/section-card";
import { fetchBasicInfo } from "@/app/lib/data";

export default async function DashboardAbout() {
    const basicInfo = await fetchBasicInfo();

    return (
        <div>
            {/* <p>Dashboard About Page</p> */}
            <div className="mx-auto max-w-5xl space-y-8">
                <h1 className="text-3xl font-bold">
                    About Management
                </h1>
                <div className="rounded-xl border dark:bg-black p-6 shadow-sm">
                    {/* <div className="flex items-center gap-4">
                        <div className="h-24 w-24 rounded-xl border bg-gray-100" />
                        <div className="flex-col">
                            <label className="mb-2 block text-sm font-medium">
                                Profile Image
                            </label>
                            <Input className="rounded-xl" type="file" accept="image/*" placeholder="Upload Image"
                            />
                        </div>
                    </div> */}
                    <SectionCard className="border-transparent !mt-0 !pt-0 dark:border-transparent" title="Basic Information">
                        {/* {(isEditing) => (
                            <BasicInfo isEditing={isEditing} />
                        )} */}
                        <BasicInfo basicInfo={basicInfo} editable/>
                    </SectionCard>

                    <SectionCard title="About Section">
                        <></>
                    </SectionCard>

                    <SectionCard title="Social Links">
                        <></>
                    </SectionCard>

                    <SectionCard title="Statistics">
                        <></>
                    </SectionCard>
                </div>
            </div>
            <AboutForm/>
        </div>
    )
}