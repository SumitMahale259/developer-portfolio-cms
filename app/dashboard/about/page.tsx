import AboutForm from "@/app/components/dashboard/ui/about-form";
import AboutBio from "@/app/components/dashboard/ui/about/about-bio";
import BasicInfo from "@/app/components/dashboard/ui/about/basic-info";
import SocialLinks from "@/app/components/dashboard/ui/about/social-links";
import Statistics from "@/app/components/dashboard/ui/about/statistics";
import UploadResume from "@/app/components/dashboard/ui/about/upload-resume";
import SectionCard from "@/app/components/dashboard/ui/section-card";
import { fetchAbout } from "@/app/lib/data";

export default async function DashboardAbout() {
    const about = await fetchAbout({
        include: {
            profileImg: true,
            resume: true,
        }
    });

    return (
        <div>
            <div className="mx-auto max-w-5xl space-y-8">
                <h1 className="text-3xl font-bold">
                    About Management
                </h1>
                <div className="rounded-xl border dark:bg-black p-6 shadow-sm">
                    <SectionCard className="border-transparent !mt-0 !pt-0 dark:border-transparent">
                        <BasicInfo editable basicInfo={about}/>
                    </SectionCard>

                    <SectionCard>
                        <AboutBio editable about={about}/>
                    </SectionCard>

                    <SectionCard>
                        <SocialLinks editable about={about}/>
                    </SectionCard>

                    <SectionCard>
                        <Statistics editable about={about}/>
                    </SectionCard>

                    <SectionCard>
                        <UploadResume editable about={about}/>
                    </SectionCard>
                </div>
            </div>
            <AboutForm/>
        </div>
    )
}