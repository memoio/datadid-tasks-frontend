'use client'

import React from 'react';
import Activity from '@/app/components/Cycle/Activity';
import { useParams } from 'next/navigation';
import { useAction } from '@/app/lib/context/ActionContext'
const ProjectPage = () => {
    const { projectId } = useParams();
    const { joinProject } = useAction();


    if (projectId) {
        const value = Number(projectId)
        return (
            <div>
                <Activity joinId={value} />
            </div>
        );
    }
};

export default ProjectPage;